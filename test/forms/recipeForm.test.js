import {RecipeForm} from '../../src/forms/recipeForm';

describe('RecipeForm', () => {

  it('should have the correct properties', done => {
    expect(RecipeForm).to.include.all.keys('name', 'ingredients', 'preparation');
    done();
  });

  it('should validate the name', done => {
    RecipeForm.name.validate('Awesome pizza!').then(isValid => {
      expect(isValid).to.be.true;
      done();
    });
  });

  it('should fail validation if name is not of the required length', done => {
    RecipeForm.name.validate('').then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });

  it('should fail validation if an unexpected type is found for the name', done => {
    RecipeForm.name.validate({}).then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });

  it('should validate the ingredients', done => {
    RecipeForm.ingredients.validate([
      {name: 'Rice', quantity: '1 cup'},
      {name: 'Salt', quantity: '1 tbsp'}
    ]).then(isValid => {
      expect(isValid).to.be.true;
      done();
    });
  });

  it('should fail if no ingredients are passed', done => {
    RecipeForm.ingredients.validate([]).then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });

  it('should fail if more than the required ingredients are passed', done => {
    RecipeForm.ingredients.validate([
      {name: 'Rice', quantity: '1 cup'},
      {name: 'Salt', quantity: '1 tbsp'},
      {name: 'Water', quantity: '1/2 cup'},
      {name: 'Pepper', quantity: '1 tbsp'},
      {name: 'Paprika', quantity: '1 tbsp'},
      {name: 'Onion', quantity: '1 unit'},
      {name: 'Garlic', quantity: '1 unit'},
      {name: 'Chicken', quantity: '1 whole chicken'},
      {name: 'Chilli', quantity: '1 tbsp'},
      {name: 'Oregano', quantity: '1 unit'},
      {name: 'Extra ingredient', quantity: '1 unit'},
    ]).then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });

});
