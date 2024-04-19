

export enum PracticeApplicationEvents {
    SENT_FOR_REVIEW_BY_CEMPRE = 'Enviado para revisar por CEMPRE',
    REVIEWED_BY_CEMPRE = 'Revisado por CEMPRE',
    REVIEWED_BY_PROGRAM = 'Revisado por el comité de practica del programa',
    REVIEWED_BY_FACULTY = 'Revisado por el comité de practicas de la facultad',
    PRACTICES_APPROVED = 'Practicas avaladas',
    PRACTICES_REJECTED = 'Practicas rechazadas'
}

export enum PracticeApplicationStatus {
    NOT_REVIEWED = 'Sin revisar',
    TO_CORRECT = 'Por corregir',
    UPDATED = 'Actualizado',
    CORRECT = 'Correcto',
    REJECTED = 'Rechazado',
    APPROVED = 'Avalado'
}