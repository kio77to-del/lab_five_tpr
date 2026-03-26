export default function StepSection({ title, children }) {
    return (
        <section className="step-section">
            <h2>{title}</h2>
            {children}
        </section>
    );
}