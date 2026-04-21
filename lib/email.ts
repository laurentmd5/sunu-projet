import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

type TaskAssignmentEmailParams = {
    to: string;
    assigneeName?: string | null;
    projectName: string;
    projectId: string;
    taskName: string;
    dueDate?: Date | null;
};

type MeetingInvitationEmailParams = {
    to: string;
    participantName?: string | null;
    actorName?: string | null;
    meetingTitle: string;
    meetingId: string;
    scheduledAt: Date | string;
    durationMinutes?: number | null;
    projectName?: string | null;
    externalUrl?: string | null;
};

function formatDueDate(date?: Date | null) {
    if (!date) return "Aucune date limite";
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
        timeStyle: "short",
    }).format(date);
}

function formatMeetingDate(date: Date | string) {
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
        timeStyle: "short",
    }).format(new Date(date));
}

function formatMeetingDuration(durationMinutes?: number | null) {
    if (!durationMinutes) return "Non précisée";
    return `${durationMinutes} min`;
}

export async function sendTaskAssignmentEmail({
    to,
    assigneeName,
    projectName,
    projectId,
    taskName,
    dueDate,
}: TaskAssignmentEmailParams) {
    if (!resend) {
        console.warn("RESEND_API_KEY absente : email non envoyé.");
        return;
    }

    const appBaseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
    const emailFrom =
        process.env.EMAIL_FROM || "Sunu Projets <onboarding@resend.dev>";

    const projectUrl = `${appBaseUrl}/project/${projectId}`;
    const safeName = assigneeName?.trim() || "Bonjour";

    const { data, error } = await resend.emails.send({
        from: emailFrom,
        to,
        subject: `Nouvelle tâche assignée : ${taskName}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
            <h2>Nouvelle tâche assignée</h2>
            <p>${safeName},</p>
            <p>Une nouvelle tâche vous a été assignée dans <strong>${projectName}</strong>.</p>

            <ul>
              <li><strong>Tâche :</strong> ${taskName}</li>
              <li><strong>Date limite :</strong> ${formatDueDate(dueDate)}</li>
            </ul>

            <p>
              <a href="${projectUrl}" style="display:inline-block;padding:10px 16px;background:#2563eb;color:white;text-decoration:none;border-radius:8px;">
                Ouvrir le projet
              </a>
            </p>

            <p style="margin-top:24px;font-size:14px;color:#6b7280;">
              Email envoyé automatiquement par Sunu Projets.
            </p>
          </div>
        `,
        text: `${safeName},

Une nouvelle tâche vous a été assignée dans ${projectName}.

Tâche : ${taskName}
Date limite : ${formatDueDate(dueDate)}

Ouvrir le projet : ${projectUrl}

Email envoyé automatiquement par Sunu Projets.`,
    });

    if (error) {
        console.error("Erreur Resend :", error);
        throw new Error(error.message || "Erreur lors de l'envoi de l'email.");
    }

    console.log("Email envoyé via Resend :", data);
}

export async function sendMeetingInvitationEmail({
    to,
    participantName,
    actorName,
    meetingTitle,
    meetingId,
    scheduledAt,
    durationMinutes,
    projectName,
    externalUrl,
}: MeetingInvitationEmailParams) {
    if (!resend) {
        console.warn("RESEND_API_KEY absente : email non envoyé.");
        return;
    }

    const appBaseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
    const emailFrom =
        process.env.EMAIL_FROM || "Sunu Projets <onboarding@resend.dev>";

    const meetingUrl = `${appBaseUrl}/meetings/${meetingId}`;
    const safeParticipantName = participantName?.trim() || "Bonjour";
    const safeActorName = actorName?.trim() || "Un collaborateur";
    const safeProjectName = projectName?.trim() || "Réunion autonome";
    const meetingDate = formatMeetingDate(scheduledAt);
    const meetingDuration = formatMeetingDuration(durationMinutes);
    const videoLine = externalUrl
        ? `Lien de visioconférence : ${externalUrl}`
        : "Le lien de visioconférence sera ajouté dans l'application si nécessaire.";

    const { data, error } = await resend.emails.send({
        from: emailFrom,
        to,
        subject: `Invitation à une réunion : ${meetingTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
            <h2>Invitation à une réunion</h2>
            <p>${safeParticipantName},</p>
            <p>${safeActorName} vous a invité à la réunion <strong>${meetingTitle}</strong>.</p>

            <ul>
              <li><strong>Contexte :</strong> ${safeProjectName}</li>
              <li><strong>Date :</strong> ${meetingDate}</li>
              <li><strong>Durée prévue :</strong> ${meetingDuration}</li>
              <li><strong>Visioconférence :</strong> ${
                  externalUrl
                      ? `<a href="${externalUrl}">${externalUrl}</a>`
                      : "Lien à venir dans l'application"
              }</li>
            </ul>

            <p>
              <a href="${meetingUrl}" style="display:inline-block;padding:10px 16px;background:#2563eb;color:white;text-decoration:none;border-radius:8px;">
                Ouvrir la réunion
              </a>
            </p>

            <p style="margin-top:24px;font-size:14px;color:#6b7280;">
              Email envoyé automatiquement par Sunu Projets.
            </p>
          </div>
        `,
        text: `${safeParticipantName},

${safeActorName} vous a invité à la réunion "${meetingTitle}".

Contexte : ${safeProjectName}
Date : ${meetingDate}
Durée prévue : ${meetingDuration}
${videoLine}

Ouvrir la réunion : ${meetingUrl}

Email envoyé automatiquement par Sunu Projets.`,
    });

    if (error) {
        console.error("Erreur Resend :", error);
        throw new Error(error.message || "Erreur lors de l'envoi de l'email.");
    }

    console.log("Email réunion envoyé via Resend :", data);
}
