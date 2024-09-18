import os
import json
import jsonschema
import sys
from jsonschema import validate

def load_schema(schema_path):
    with open(schema_path, 'r') as file:
        return json.load(file)

def validate_json_file(json_file, schema):
    try:
        with open(json_file, 'r') as file:
            data = json.load(file)
        validate(instance=data, schema=schema)
        return True, None
    except jsonschema.exceptions.ValidationError as err:
        return False, str(err)
    except Exception as e:
        return False, str(e)

def main():
    schema_path = './utility/schema.json'
    schema = load_schema(schema_path)
    
    validation_failed = False
    
    for filename in os.listdir('./'):
        if filename.endswith('.json') and filename != 'schema.json':
            valid, error = validate_json_file(filename, schema)
            if valid:
                print(f"✅ {filename} is valid")
            else:
                print(f"::group::❌ {filename} is invalid")
                print(error)
                print("::endgroup::")
                validation_failed = True

    if validation_failed:
        sys.exit(1)

if __name__ == "__main__":
    main()
