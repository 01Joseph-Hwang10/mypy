from add import add_two_numbers




def main(__variables, __files):
	a=float(__variables['a'])
	b=int(__variables['b'])

	result = add_two_numbers(a,b)

	return result
