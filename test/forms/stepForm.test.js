import {StepForm} from '../../src/forms/stepForm';

describe('StepForm', () => {

  it('should have the correct properties', done => {
    expect(StepForm).to.include.all.keys('step');
    done();
  });

  it('should validate the step', done => {
    StepForm.step.validate('Mix the ingredients').then(isValid => {
      expect(isValid).to.be.true;
      done();
    });
  });

  it('should fail validation if step is not of the required length', done => {
    StepForm.step.validate('').then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });

  it('should fail validation if an unexpected type is found for the step', done => {
    StepForm.step.validate({}).then(isValid => {
      expect(isValid).to.be.false;
      done();
    });
  });
});