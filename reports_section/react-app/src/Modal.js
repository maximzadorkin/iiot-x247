export function Modal(contents) {
  const modalBackgroundStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100vh',
    width: '100vw'
  };
  const closeButtonStyle = {
    position: 'relative',
    top: 0,
    right: 0
  };

  const classesForBlock = [
    'container',
    'bg-light',
    'border',
    'rounded',
    'w-90'
  ];

  <div 
    style = { modalBackgroundStyle }
    className = "container d-flex justify-content-center align-items-center bg-light">
      <div className = { classesForBlock.join(' ') }>
        <span aria-hidden="true" style={ closeButtonStyle }>&times;</span>
        { this.InterviewFavorites(false) }
      </div>
  </div>
}