from sentence_transformers import CrossEncoder
import sys

def main():
    # 1. Load a pre-trained CrossEncoder model
    model = CrossEncoder("cross-encoder/qnli-electra-base")

    query1 = "Is this an essay question!"
    query2 = "Is this an essay question?"

    question1 = ["Write an essay question on vendor."]
    question2 = ["will you an essay question on vendor?"]

    ranks = model.rank(query1, question1, show_progress_bar=True)
    print(model.rank(query2, question2), "here")

    return ranks
    


if __name__ == "__main__":
    questionPDF = sys.stdin.read() # gets the input from node child process
    ranks = main()
    sys.stdout.write(str(ranks))


# notes

"""
sentence-transfomers
model.rank is more suited to check the rank of the questions
    The idea is to keep model questions for
"""