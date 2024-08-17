
export type StatusTostify="success"|"error"|"warning"|"info"

export interface BodyTostify{
    message:string
    status:StatusTostify
}

