describe('App E2E', () => {

    it('submitting addNewNote form', () => {
      cy.visit('/');
      
      cy.log('filling out title')
      cy.get('form.AddNoteForm_addNewPostForm__3SGfR input[name="title"]').type('shop')

      cy.log('filling out title')
      cy.get('form.AddNoteForm_addNewPostForm__3SGfR input[name="descr"]').type('apples, bannanas')

      cy.log('submiting formtest:cypress')
      cy.get('form.AddNoteForm_addNewPostForm__3SGfR').submit()
    })

    it('displays addNewNote form validation', () => {
      cy.get('form.AddNoteForm_addNewPostForm__3SGfR input[name="title"]').clear() 
      cy.get('form').submit()
      cy.get('span.Form_span_error__3ESaK').should('contain', 'Required')
    })

    it('checking location', () => {
      cy.get('#notes-title').click()
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq('http://localhost:3000/notes')
      })
    })
    
})