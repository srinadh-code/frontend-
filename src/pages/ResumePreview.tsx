


export default function ResumePreview({ data }) {
  return (
    <div className="bg-white p-8 shadow-lg max-w-[800px] mx-auto">

      {/* BASIC INFO */}
      <h1 className="text-2xl font-bold">
        {data?.full_name || "John Doe"}
      </h1>

      <p>
        {(data?.email || "john@example.com")} | {(data?.phone || "+1234567890")}
      </p>

      {/* SUMMARY */}
      {data?.summary && (
        <>
          <h2 className="mt-4 font-bold">Summary</h2>
          <p>{data.summary}</p>
        </>
      )}

      {/* SKILLS */}
      {(data?.skills?.length > 0) && (
        <>
          <h2 className="mt-4 font-bold">Skills</h2>
          {(data.skills || []).map((s, i) => (
            <p key={i}>• {s?.name || "Skill"}</p>
          ))}
        </>
      )}

      {/* EXPERIENCE */}
      {(data?.experiences?.length > 0) && (
        <>
          <h2 className="mt-4 font-bold">Experience</h2>
          {(data.experiences || []).map((e, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">
                {e?.job_title || "Role"}
              </p>
              <p className="text-blue-600">
                {e?.company || "Company"}
              </p>
              {e?.period && (
                <p className="text-sm text-gray-500">{e.period}</p>
              )}
              {e?.desc && (
                <p className="text-sm">{e.desc}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* EDUCATION */}
      {(data?.educations?.length > 0) && (
        <>
          <h2 className="mt-4 font-bold">Education</h2>
          {(data.educations || []).map((e, i) => (
            <div key={i}>
              <p>{e?.degree || "Degree"}</p>
              <p className="text-sm text-gray-600">
                {e?.institution || "Institution"}
              </p>
            </div>
          ))}
        </>
      )}

      {/* PROJECTS */}
      {(data?.projects?.length > 0) && (
        <>
          <h2 className="mt-4 font-bold">Projects</h2>
          {(data.projects || []).map((p, i) => (
            <p key={i}>{p?.title || "Project"}</p>
          ))}
        </>
      )}

      {/* CERTIFICATIONS */}
      {(data?.certifications?.length > 0) && (
        <>
          <h2 className="mt-4 font-bold">Certifications</h2>
          {(data.certifications || []).map((c, i) => (
            <p key={i}>{c?.name || "Certificate"}</p>
          ))}
        </>
      )}

      {/* ACHIEVEMENTS */}
      {(data?.achievements?.length > 0) && (
        <>
          <h2 className="mt-4 font-bold">Achievements</h2>
          {(data.achievements || []).map((a, i) => (
            <p key={i}>{a?.title || "Achievement"}</p>
          ))}
        </>
      )}

      {/* LANGUAGES */}
      {(data?.languages?.length > 0) && (
        <>
          <h2 className="mt-4 font-bold">Languages</h2>
          {(data.languages || []).map((l, i) => (
            <p key={i}>{l?.name || "Language"}</p>
          ))}
        </>
      )}

    </div>
  );
}