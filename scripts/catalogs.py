"""Load named catalog records while retaining each original table's column order."""
import json

def load_catalogs(root):
    data = root / 'data'
    catalogs = json.loads((data / 'guide-catalogs.json').read_text(encoding='utf-8'))
    for table in catalogs.values():
        if 'records_file' in table:
            records = json.loads((data / table['records_file']).read_text(encoding='utf-8'))
            table['rows'] = [[record.get(field, '') for field in table['fields'][:record.get('_cell_count', len(table['fields']))]] for record in records]
    return catalogs
