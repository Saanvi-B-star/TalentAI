function isHoneypot(candidate) {
    const { skills, career_history, profile } = candidate;

    // Check 1: Expert skill with 0 months of experience
    const expertNoExp = skills.some(
        (s) => s.proficiency === "expert" && s.duration_months === 0
    );

    if (expertNoExp) return true;

    // Check 2: Multiple current jobs
    const currentRoles = career_history.filter(
        (r) => r.is_current
    );

    if (currentRoles.length > 1) return true;

    // Check 3: Total career months exceed claimed experience
    const totalMonths = career_history.reduce(
        (sum, role) => sum + role.duration_months,
        0
    );

    const claimedMonths = profile.years_of_experience * 12;

    if (totalMonths > claimedMonths * 1.3 + 12) {
        return true;
    }

    // Check 4: Overlapping employment dates
    const sorted = [...career_history]
        .filter((r) => r.start_date && r.end_date)
        .sort(
            (a, b) =>
                new Date(a.start_date) - new Date(b.start_date)
        );

    for (let i = 1; i < sorted.length; i++) {
        if (
            new Date(sorted[i].start_date) <
            new Date(sorted[i - 1].end_date)
        ) {
            return true;
        }
    }

    return false;
}

module.exports = { isHoneypot };