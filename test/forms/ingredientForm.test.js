import {IngredientForm} from '../../src/forms/ingredientForm';

describe('IngredientForm', () => {

  it('should have the correct properties', done => {
    expect(IngredientForm).to.include.all.keys('name', 'amount');
    done();
  });

  it('should validate the name', done => {
    IngredientForm.name.validate('Rice').then(isValid => {
      expect(isValid).to.be.true;
      done();
    });
  });

  it('should fail validation if name is not of the required length', done => {
    IngredientForm.name.validate('').then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });

  it('should fail validation if an unexpected type is found for the name', done => {
    IngredientForm.name.validate({}).then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });

  it('should validate the amount', done => {
    IngredientForm.amount.validate('1 tbsp').then(isValid => {
      expect(isValid).to.be.true;
      done();
    });
  });

  it('should fail validation if quantity is not of the required length', done => {
    IngredientForm.amount.validate('').then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });

  it('should fail validation if an unexpected type is found for the quantity', done => {
    IngredientForm.amount.validate({}).then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });

});
