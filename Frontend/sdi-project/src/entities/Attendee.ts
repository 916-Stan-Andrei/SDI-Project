interface Attendee{
    id?:number,
    firstName: string,
    lastName: string,
    birthDate: string,
    ticketOwner: boolean,
    ticketId?: number 
}

export default Attendee;