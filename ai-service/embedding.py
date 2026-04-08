from sentence_transformers import SentenceTransformer
import numpy as np

# Load a fast, lightweight open-source embedding model
# all-MiniLM-L6-v2 outputs 384-dimensional vectors
print("Loading model. This might take a moment on first run...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded successfully.")

def get_embedding(text: str) -> list[float]:
    """Generates an embedding for a given string."""
    vector = model.encode(text)
    return vector.tolist()

def extract_highlighted_sentence(query: str, abstract: str) -> str:
    """
    Splits the abstract into sentences, embeds each, and finds the one 
    most semantically similar to the query. Returns the abstract with the 
    best sentence wrapped in <mark> tags.
    """
    if not abstract:
        return ""
        
    query_emb = model.encode(query)
    
    # Simple chunking by period for MVP.
    sentences = [s.strip() + "." for s in abstract.split(".") if len(s.strip()) > 5]
    if not sentences:
        return abstract

    sentence_embs = model.encode(sentences)
    
    # Compute cosine similarities
    similarities = model.similarity(query_emb, sentence_embs)[0]
    best_idx = int(np.argmax(similarities))
    
    best_sentence = sentences[best_idx]
    
    # Highlight the best sentence in the generic abstract
    highlighted_abstract = abstract.replace(
        best_sentence[:-1], # Remove trailing period for safer matching
        f"<mark>{best_sentence[:-1]}</mark>"
    )
    
    return highlighted_abstract
