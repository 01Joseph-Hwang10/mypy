# mypy

## Todo

- Generate .pyz file with user id, executing datetime appended at the file name. There would be minor fixes on source code on doing that

```python
with open(os.path.join(script_directory, file_path), 'w') as f:
    f.write('import os\n')
    f.write(
        f"with open('{os.path.join(save_directory,f'input/__args_{user_id}.py')}', 'r') as f:\n")
    f.write('    __code = f.read()\n')
    f.write('exec(__code)\n')
```

- Do the same thing at input, data, output, log. Think about how to deal with it.

- In the case of \_\_args.py, append user id at the name. Same at log and output. You would need to change create app view accordingly.
