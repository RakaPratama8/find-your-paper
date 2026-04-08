interface PaperProps {
  paper: {
    id: string;
    title: string;
    doi: string | null;
    authors: string[];
    publication_year: number;
    abstract: string;
    highlighted_abstract: string;
    similarity_score: number;
  }
}

export default function PaperCard({ paper }: PaperProps) {
  let badgeClass = 'similarity-medium';
  let scoreLabel = 'Medium Relevance';
  
  if (paper.similarity_score >= 0.70) {
    badgeClass = 'similarity-high';
    scoreLabel = 'High Relevance';
  }

  const scorePercent = (paper.similarity_score * 100).toFixed(0) + '%';

  return (
    <div className="paper-card glass-panel">
      <div className="paper-header">
        <div>
          <h3>{paper.title}</h3>
          <div className="authors-list">
            {paper.authors.length > 0 ? paper.authors.join(', ') : 'Unknown Authors'}
          </div>
        </div>
        <div className={`similarity-badge ${badgeClass}`}>
          <span>{scorePercent}</span>
          <span style={{fontSize: '0.75rem', opacity: 0.8}}>{scoreLabel}</span>
        </div>
      </div>
      
      <div className="paper-meta">
        <span>Published: {paper.publication_year}</span>
        {paper.doi && <span>|</span>}
        {paper.doi && <span>{paper.doi}</span>}
      </div>

      <div className="abstract-container" dangerouslySetInnerHTML={{ __html: paper.highlighted_abstract || paper.abstract }} />

      <div className="links">
        {paper.doi && (
          <a href={paper.doi} target="_blank" rel="noopener noreferrer" className="link-external">
            Read Full Paper ↗
          </a>
        )}
      </div>
    </div>
  );
}
