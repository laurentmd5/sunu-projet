import { TeamRole } from "./team-roles";

export const TEAM_ROLE_LABELS: Record<TeamRole, string> = {
    OWNER: "Owner",
    MEMBER: "Member",
} as const;
