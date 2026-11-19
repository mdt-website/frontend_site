export default function Hero({ eyebrow, title, accent, text, image, page = true, center = true, children }) {
  return (
    <section className={`hero ${page ? 'hero--page' : ''} ${center ? 'center' : ''}`} style={{ backgroundImage: `url(${image})` }}>
      <div className="container">
        {eyebrow && <span className="pill">{eyebrow}</span>}
        <h1 className="h1">{title}{accent && <> <span className="accent">{accent}</span></>}</h1>
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
    </section>
  );
}
