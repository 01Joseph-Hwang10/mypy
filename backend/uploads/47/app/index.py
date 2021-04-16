import sys
from add import add_two_numbers

def input_receiver():

	a = float(sys.argv[-1]['__args_input_47']['	a'])
	b = int(sys.argv[-1]['__args_input_47']['	b'])

	return a,b


def main():

	a, b = input_receiver()

	result = add_two_numbers(a,b)

	return result
