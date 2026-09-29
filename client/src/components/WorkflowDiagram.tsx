import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronRight, CircleDot, MousePointer2 } from "lucide-react";

type WorkflowStep = {
  title: string;
  status: "COMPLETE" | "ACTIVE" | "REVIEW" | "QUEUED" | "SHIPPED";
  detail: string;
  next: string;
};

const steps: WorkflowStep[] = [
  { title: "Idea captured", status: "COMPLETE", detail: "Turn the rough signal into a clear problem worth solving.", next: "Write the one-sentence outcome." },
  { title: "Break into tasks", status: "COMPLETE", detail: "Convert the idea into a small sequence of shippable moves.", next: "Choose the smallest useful first step." },
  { title: "Research context", status: "REVIEW", detail: "Collect references, constraints, and the evidence needed to build well.", next: "Mark the assumptions that need testing." },
  { title: "Build first version", status: "ACTIVE", detail: "Make the simplest working version and keep the feedback loop short.", next: "Ship a rough pass before polishing." },
  { title: "Test and debug", status: "QUEUED", detail: "Exercise the edges, remove friction, and make the behavior dependable.", next: "Run the happy path and one failure path." },
  { title: "LLM review", status: "QUEUED", detail: "Use a thinking partner to challenge the plan and expose blind spots.", next: "Ask for risks, alternatives, and next actions." },
  { title: "Finalize desktop", status: "QUEUED", detail: "Bring the final interaction, visual system, and content together.", next: "Open the finished MIT POV OS workspace." },
  { title: "Ship and document", status: "SHIPPED", detail: "Publish the result and leave a trail that makes the next iteration easier.", next: "Write the release note and share the link." },
];

export default function WorkflowDiagram({ onFinalize }: { onFinalize: () => void }) {
  const [selected, setSelected] = useState(3);
  const current = steps[selected];
  const progress = useMemo(() => Math.round(((selected + 1) / steps.length) * 100), [selected]);

  return (
    <section className="workflow-panel" aria-labelledby="workflow-title">
      <div className="workflow-heading">
        <div>
          <span className="workflow-kicker"><CircleDot size={12} /> MIT POV OS / WORKFLOW MAP</span>
          <h2 id="workflow-title">From signal to shipped.</h2>
          <p>A visual path for turning rough ideas into finished systems.</p>
        </div>
        <div className="workflow-progress"><strong>{progress}%</strong><span>WORKFLOW SIGNAL</span></div>
      </div>

      <div className="workflow-track" role="list" aria-label="Project workflow">
        {steps.map((step, index) => (
          <div className="workflow-track-item" key={step.title} role="listitem">
            <button className={`workflow-step ${selected === index ? "selected" : ""} workflow-${step.status.toLowerCase()}`} onClick={() => setSelected(index)} aria-label={`Open workflow step ${index + 1}: ${step.title}`}>
              <span className="workflow-number">0{index + 1}</span>
              <span className="workflow-step-title">{step.title}</span>
              <span className="workflow-status">{step.status}</span>
              {step.status === "COMPLETE" && <Check size={13} className="workflow-check" />}
            </button>
            {index < steps.length - 1 && <ArrowRight className="workflow-arrow" size={17} aria-hidden="true" />}
          </div>
        ))}
      </div>

      <div className="workflow-detail">
        <div className="workflow-detail-index">STEP {String(selected + 1).padStart(2, "0")}</div>
        <div className="workflow-detail-copy"><span className="workflow-detail-status">{current.status}</span><h3>{current.title}</h3><p>{current.detail}</p></div>
        <div className="workflow-next"><span>NEXT ACTION</span><strong>{current.next}</strong></div>
        <button className="workflow-finalize" onClick={onFinalize}><MousePointer2 size={14} /> Finalize desktop <ChevronRight size={15} /></button>
      </div>
    </section>
  );
}
