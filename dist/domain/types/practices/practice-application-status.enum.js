"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeApplicationStatus = exports.PracticeApplicationEvents = void 0;
var PracticeApplicationEvents;
(function (PracticeApplicationEvents) {
    PracticeApplicationEvents["SENT_FOR_REVIEW_BY_CEMPRE"] = "Enviado para revisar por CEMPRE";
    PracticeApplicationEvents["REVIEWED_BY_CEMPRE"] = "Revisado por CEMPRE";
    PracticeApplicationEvents["REVIEWED_BY_PROGRAM"] = "Revisado por el comit\u00E9 de practica del programa";
    PracticeApplicationEvents["REVIEWED_BY_FACULTY"] = "Revisado por el comit\u00E9 de practicas de la facultad";
    PracticeApplicationEvents["PRACTICES_APPROVED"] = "Practicas avaladas";
    PracticeApplicationEvents["PRACTICES_REJECTED"] = "Practicas rechazadas";
})(PracticeApplicationEvents || (exports.PracticeApplicationEvents = PracticeApplicationEvents = {}));
var PracticeApplicationStatus;
(function (PracticeApplicationStatus) {
    PracticeApplicationStatus["NOT_REVIEWED"] = "Sin revisar";
    PracticeApplicationStatus["TO_CORRECT"] = "Por corregir";
    PracticeApplicationStatus["UPDATED"] = "Actualizado";
    PracticeApplicationStatus["CORRECT"] = "Correcto";
    PracticeApplicationStatus["REJECTED"] = "Rechazado";
    PracticeApplicationStatus["APPROVED"] = "Avalado";
})(PracticeApplicationStatus || (exports.PracticeApplicationStatus = PracticeApplicationStatus = {}));
