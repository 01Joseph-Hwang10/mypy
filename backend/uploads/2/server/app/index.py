

def main(__variables, __files):
	str_input=float(__variables['str_input'])
	list_input=list(__variables['list_input'])
	dict_input=dict(__variables['dict_input'])
	bool_input=bool(__variables['bool_input'])

	print('str: ',str_input)
	print('list: ',list_input)
	print(list_input[0])
	print('dict: ',dict_input)
	print(dict_input['var1'])
	print('bool: ',bool_input)

	return "Process was successfully done!"


