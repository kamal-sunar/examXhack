import pymongo
from dotenv import load_dotenv, dotenv_values
import os

# Load environment variables from .env file (if present)
load_dotenv()

"""
Mongo  class is an interface to the mongodb database.

The parameters passed are:
    1. db_name      - equivalent to name of university.
    2. collection   - equivalent to "faculty_semster_subject"


    Logical view of the database

    ------------------
    |   Database      |
    | (different for  |
    |  each university|
    -------------------
            |
            |
     ------------------ 
    |   Collections   |
    -------------------
            |
            |
     -------------------
     |   unique for each|
     |  question topic  |
     --------------------
"""
class mongo:
    def __init__(
            this, 
            db_name, 
            collection): 
        this.mongodb = pymongo.MongoClient(os.getenv("mogodb_url"))[db_name] # instance of mongodb database
        this.collection = collection


    """
        Returns model (of type dictionery) for mongodb database
    """
    @staticmethod
    def model( 
        year: int,
        question: str,
        question_number: str,
        topic: str):
        return {
            "year"           :year,
            "question"       :question,
            "question number":question_number,
            "topic"          :topic,
        }


    """
        Posts qustions to the database

        Takes list of model dict, defined in mention right above.

        Returns "True" if posted success fully
    """
    def post(this ,models):
        try:
            # if models list is empty exit
            if (len(models) == 0):
                return False

            incorrect_models = [] # list of models which are incorrect

            # if the model is not as defined on models method
            for model in models:
                if (model.get("year") and model.get("question") and model.get("question number") and model.get("topic")):
                    incorrect_models.append(model)
                    models.remove(model)

            if len(incorrect_models) > 0:
                print("These models are defective: ", incorrect_models)

            if len(models) > 0:
                # post model to the database
                post_to_db = this.mongodb[this.collection].insert_many(models)

                if post_to_db.inserted_ids:
                    return True
                else:
                    return False
            else:
                print("No valid models were found.")
                return False

        except Exception as error:
            print(error)
            return False