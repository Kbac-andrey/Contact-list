async function getContacts () {
  const response = await fetch('https://randomuser.me/api/?results=100')
  const contacts = await response.json()
  return contacts.results
}

export { getContacts }
