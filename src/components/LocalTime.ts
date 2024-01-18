export const LocalDate = (time: Date | number) => {
    const localTime = new Date(time)
    return localTime.toLocaleString()
  }