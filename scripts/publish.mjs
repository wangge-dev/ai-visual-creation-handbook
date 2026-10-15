import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const executable = process.env.GIT_BIN || 'git';
const env = {...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never'};
function git(args, allowEmpty = false) {
  const result = spawnSync(executable,args,{cwd:root,env,encoding:'utf8',windowsHide:true});
  if(result.status!==0 && !allowEmpty) throw Error(`Git ${args[0]} failed: ${result.stderr}`);
  return result.stdout.trim();
}
const remote=git(['remote','get-url','origin']);
if(!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\.git$/.test(remote)) throw Error('Expected a configured GitHub HTTPS origin');
const dist=path.join(root,'dist');
await fs.access(path.join(dist,'index.html'));
await fs.access(path.join(dist,'downloads/handbook.md'));
await fs.writeFile(path.join(dist,'.nojekyll'),'');
const metadata=path.join(root,'.maintenance/pages.git');
await fs.mkdir(path.dirname(metadata),{recursive:true});
try {await fs.access(metadata);} catch {git(['init','--bare',metadata]);}
const prefix=['--git-dir',metadata,'--work-tree',dist];
const run=args=>git([...prefix,...args]);
run(['config','user.name',git(['config','user.name']) || 'Handbook maintainer']);
run(['config','user.email',git(['config','user.email']) || 'maintainer@users.noreply.github.com']);
run(['config','core.autocrlf','false']);
const known=git(['ls-remote',remote,'refs/heads/gh-pages']);
if(known) {run(['fetch',remote,'gh-pages']);run(['update-ref','refs/heads/gh-pages','FETCH_HEAD']);run(['read-tree','refs/heads/gh-pages']);}
run(['symbolic-ref','HEAD','refs/heads/gh-pages']);
run(['add','--all']);
const staged=run(['diff','--cached','--name-only']);
if(!staged) {console.log('Site unchanged; no publishing commit.');process.exit(0);}
run(['commit','-m','Publish handbook from source '+git(['rev-parse','--short','HEAD'])]);
run(['push',remote,'HEAD:gh-pages']);
console.log('Published gh-pages: '+run(['rev-parse','--short','HEAD']));
