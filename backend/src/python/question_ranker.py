from sentence_transformers import CrossEncoder

class QuestionRanker:
    def __init__(self, model_name: str ="cross-encoder/qnli-electra-base", show_progress_bar: bool =True):
        """
        Initialize the QuestionRanker with a pre-trained model.
        """
        self.model_name = model_name
        self.model = CrossEncoder(model_name)
        self.show_progress_bar = show_progress_bar

    def rankquestions(self, query: str, questions: list):
        ranks = self.model.rank(query, questions, show_progress_bar=self.show_progress_bar)