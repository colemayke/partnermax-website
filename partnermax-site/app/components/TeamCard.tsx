import Image from "next/image";

export type TeamMember = {
  role: string;
  name: string;
  /** Two letters; the second renders as the italic red accent (D<em>M</em>). */
  initials: string;
  bio: string;
  meta: { label: string; value: string; href?: string }[];
  /** Optional portrait (4:3, dark/moody). Falls back to initials. */
  photo?: string;
};

/* Replaces the prototype's <image-slot> web component. The initials are
   the designed fallback; pass `photo` once a real portrait exists
   (tracked in PRE-LAUNCH.md). */
export default function TeamCard({
  member,
  delay,
}: {
  member: TeamMember;
  delay?: number;
}) {
  const [first, second] = [member.initials[0], member.initials.slice(1)];
  return (
    <article
      className="site-team__card fade-up"
      {...(delay ? { "data-delay": String(delay) } : {})}
    >
      <div className="site-team__photo">
        <div className="site-team__initials" data-fallback>
          {first}
          <em>{second}</em>
        </div>
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(max-width: 1100px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        ) : null}
      </div>
      <div className="site-team__body">
        <span className="site-team__role">{member.role}</span>
        <h3 className="site-team__name">{member.name}</h3>
        <p className="site-team__bio">{member.bio}</p>
        <div className="site-team__meta">
          {member.meta.map((m) => (
            <div className="site-team__meta-row" key={m.label}>
              <span>{m.label}</span>
              <a href={m.href ?? "#"}>{m.value}</a>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
