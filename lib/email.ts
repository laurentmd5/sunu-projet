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

function formatDueDate(date?: Date | null) {
    if (!date) return "Aucune date limite";
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
        timeStyle: "short",
    }).format(date);
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
