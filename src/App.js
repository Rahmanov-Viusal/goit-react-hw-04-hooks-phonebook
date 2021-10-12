import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContatctList';
import FilterContact from './components/FilterContact';
import Section from './components/Section';
import Container from './components/Container';
import shortid from 'shortid';
import 'modern-normalize/modern-normalize.css';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const takeCurrentValue = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };
  const getFilterContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  const handleSubmitForm = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (contacts.find(({ name }) => name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    setContacts(prev => [...prev, contact]);
  };

  const onDeleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  return (
    <Container className="App">
      <Section title="Phonebook">
        <ContactForm handleSubmitForm={handleSubmitForm} />
      </Section>
      <Section title="Contacts">
        <FilterContact value={takeCurrentValue} filter={filter} />
        <ContactList
          onDeleteContact={onDeleteContact}
          list={getFilterContact()}
        />
      </Section>
    </Container>
  );
}
