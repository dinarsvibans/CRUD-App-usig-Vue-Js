export type Worker = {
  id?: string
  firstName: string
  lastName: string
  email: string
  position: string
  isCheckedIn: boolean
  profilePicture: string
  comments:string[]
  workFlow: {
    startedAt: number
    finishedAt: number
    hoursToday: number
    hoursThisMonth: number
  }
}
