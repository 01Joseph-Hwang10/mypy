import os
with open('/mnt/wsl/mypy/backend/uploads/94/input/__args.py', 'r') as f:
    code = f.read()
exec(code)


def main():
	str_input = float(__global_vars['str_input'])
	list_input = list(__global_vars['list_input'])
	dict_input = dict(__global_vars['dict_input'])
	bool_input = bool(__global_vars['bool_input'])

	print('str: ',str_input)
	print('list: ',list_input)
	print(list_input[0])
	print('dict: ',dict_input)
	print(dict_input['var1'])
	print('bool: ',bool_input)

	return "Process was successfully done!"


