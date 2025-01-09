import sys
def read_input_from_stdin():
    """
    Read input data from standard input.
    """
    return sys.stdin.read().strip()

def write_output_to_stdout(data):
    """
    Write output data to standard output.
    """
    sys.stdout.write(str(data))
