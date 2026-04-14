export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RiskAnalysis {
    level: RiskLevel;
    reason: string;
    suggestion: string;
    score: number; // Overall risk score 0-100
}

export interface StudentMetrics {
    attendance: number;
    engagement: number;
    assignments: number;
    exams: number;
}

export const detectRisk = (metrics: StudentMetrics): RiskAnalysis => {
    const { attendance, engagement, assignments, exams } = metrics;
    
    // Logic for HIGH RISK
    if (attendance < 60 || engagement < 50 || assignments < 50 || exams < 40) {
        let reasons = [];
        if (attendance < 60) reasons.push(`Critical attendance (${attendance}%)`);
        if (engagement < 50) reasons.push(`Low engagement (${engagement}/100)`);
        if (assignments < 50) reasons.push(`Assignment backlog (${assignments}%)`);
        if (exams < 40) reasons.push(`Critical exam failure (${exams}%)`);

        return {
            level: 'HIGH',
            reason: reasons.join(' and '),
            suggestion: "Immediate intervention required. Increase study time by 2+ hours/day and attend all upcoming classes.",
            score: 85
        };
    }

    // Logic for MEDIUM RISK
    if (attendance <= 75 || engagement <= 70 || assignments <= 70) {
        let reasons = [];
        if (attendance <= 75) reasons.push(`Sub-optimal attendance (${attendance}%)`);
        if (engagement <= 70) reasons.push(`Moderate engagement (${engagement}/100)`);
        if (assignments <= 70) reasons.push(`Incomplete assignments (${assignments}%)`);

        return {
            level: 'MEDIUM',
            reason: reasons.join(', '),
            suggestion: "Standard warning. Focus on improving engagement in class and meeting all project deadlines.",
            score: 45
        };
    }

    // Default: LOW RISK
    return {
        level: 'LOW',
        reason: "Stable performance across all vectors.",
        suggestion: "Maintain current academic pace. Trajectory is optimal.",
        score: 15
    };
};
