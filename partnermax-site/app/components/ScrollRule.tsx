/* Divider that paints red as you scroll past it. The --rule-progress
   custom property is driven by SiteEffects (querySelectorAll on
   ".scroll-rule"); this component is just the markup. */
export default function ScrollRule({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={"scroll-rule" + (dark ? " scroll-rule--dark" : "")}
      role="presentation"
    >
      <span className="scroll-rule__fill" />
      <span className="scroll-rule__dot" />
      <span className="scroll-rule__label">{label}</span>
    </div>
  );
}
