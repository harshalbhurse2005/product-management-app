import { useParams, Link } from 'react-router-dom';

function TaskDetail({ tasks }) {
  const { id } = useParams();
  
  // Find the specific task in our list
  const task = tasks.find(t => t.id === parseInt(id));

  // If the task isn't found (e.g. user typed a wrong URL)
  if (!task) {
    return (
      <div className="container">
        <h2>Task Not Found</h2>
        <Link to="/" style={{ color: '#bb86fc' }}>Go Back</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Task Detail</h1>
      
      {/* A small box to hold the info nicely */}
      <div style={{ 
        textAlign: 'left', 
        background: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px' 
      }}>
        <p><strong style={{ color: '#bb86fc' }}>ID:</strong> {task.id}</p>
        <p><strong style={{ color: '#bb86fc' }}>Title:</strong> {task.title}</p>
        <p><strong style={{ color: '#bb86fc' }}>Status:</strong> {task.done ? "✅ Done" : "⏳ Pending"}</p>
      </div>

      <Link to="/" className="task-link" style={{ textAlign: 'center', display: 'block' }}>
        ← Back to List
      </Link>
    </div>
  );
}

export default TaskDetail;