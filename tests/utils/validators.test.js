import { validateUserRegistration, validateUserLogin, validateGoal } from '../../utils/validators.js';
import Joi from 'joi';

describe('Validators', () => {
    describe('validateUserRegistration', () => {
        it('should pass validation with valid user registration data', () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            };
            const { error, value } = validateUserRegistration(userData);
            expect(error).toBeNull();
            expect(value).toEqual(userData);
        });

        it('should fail validation with an empty username', () => {
            const userData = {
                username: '',
                email: 'test@example.com',
                password: 'password123',
            };
            const { error } = validateUserRegistration(userData);
             expect(error).toBeDefined();
              expect(error.details[0].message).toEqual('Username is required');
        });

        it('should fail validation with a username that is too short', () => {
            const userData = {
                username: 'te',
                email: 'test@example.com',
                password: 'password123',
            };
            const { error } = validateUserRegistration(userData);
            expect(error).toBeDefined();
              expect(error.details[0].message).toEqual('Username must be at least 3 characters long');
        });

          it('should fail validation with an invalid username format', () => {
            const userData = {
                username: 'test user',
                email: 'test@example.com',
                password: 'password123',
            };
            const { error } = validateUserRegistration(userData);
               expect(error).toBeDefined();
              expect(error.details[0].message).toEqual('Username must be at least 3 characters long');
        });


        it('should fail validation with an empty email', () => {
            const userData = {
                username: 'testuser',
                email: '',
                password: 'password123',
            };
            const { error } = validateUserRegistration(userData);
              expect(error).toBeDefined();
            expect(error.details[0].message).toEqual('Email is required');
        });

        it('should fail validation with an invalid email format', () => {
            const userData = {
                username: 'testuser',
                email: 'invalid-email',
                password: 'password123',
            };
            const { error } = validateUserRegistration(userData);
              expect(error).toBeDefined();
              expect(error.details[0].message).toEqual('Email must be a valid email address');
        });

        it('should fail validation with an empty password', () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: '',
            };
            const { error } = validateUserRegistration(userData);
             expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Password is required');
        });


        it('should fail validation with a password that is too short', () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'pass1',
            };
           const { error } = validateUserRegistration(userData);
             expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Password must be at least 6 characters long');
        });

        it('should handle rendering with incorrect prop types gracefully', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
             const userData = {
                username: 123,
                email: 'test@example.com',
                 password: 'password123',
             };
            const { error } = validateUserRegistration(userData);
            expect(consoleErrorSpy).toHaveBeenCalled();
              expect(error).toBeDefined();
           expect(error.details[0].message).toEqual('Username must be a string');
           consoleErrorSpy.mockRestore();
         });

           it('should handle rendering with incorrect email prop types gracefully', () => {
             const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
               const userData = {
                  username: 'testuser',
                   email: 123,
                   password: 'password123',
              };
                const { error } = validateUserRegistration(userData);
                  expect(consoleErrorSpy).toHaveBeenCalled();
                 expect(error).toBeDefined();
                expect(error.details[0].message).toEqual('Email must be a string');
                  consoleErrorSpy.mockRestore();
            });


        it('should handle rendering with incorrect password prop types gracefully', () => {
             const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const userData = {
                username: 'testuser',
                 email: 'test@example.com',
                password: 123,
            };
            const { error } = validateUserRegistration(userData);
             expect(consoleErrorSpy).toHaveBeenCalled();
                expect(error).toBeDefined();
            expect(error.details[0].message).toEqual('Password must be a string');
            consoleErrorSpy.mockRestore();
         });

        it('should return error object even if username is invalid type', () => {
            const userData = {
              username: 123,
              email: 'test@example.com',
              password: 'password123',
            };
            const { error } = validateUserRegistration(userData);
             expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Username must be a string');
        });

        it('should return error object even if email is invalid type', () => {
             const userData = {
                username: 'testuser',
                email: 123,
                password: 'password123',
             };
             const { error } = validateUserRegistration(userData);
              expect(error).toBeDefined();
              expect(error.details[0].message).toEqual('Email must be a string');
         });

       it('should return error object even if password is invalid type', () => {
            const userData = {
               username: 'testuser',
                email: 'test@example.com',
                password: 123,
            };
           const { error } = validateUserRegistration(userData);
            expect(error).toBeDefined();
            expect(error.details[0].message).toEqual('Password must be a string');
      });
    });

    describe('validateUserLogin', () => {
           it('should pass validation with valid username and password', () => {
            const userData = {
                username: 'testuser',
                password: 'password123',
            };
            const { error, value } = validateUserLogin(userData);
            expect(error).toBeNull();
             expect(value).toEqual(userData);
        });

          it('should pass validation with valid email and password', () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
            };
            const { error, value } = validateUserLogin(userData);
            expect(error).toBeNull();
            expect(value).toEqual(userData);
        });


         it('should fail validation with an empty username and email', () => {
            const userData = {
                username: '',
                email:'',
                password: 'password123',
            };
             const { error } = validateUserLogin(userData);
            expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Username is required');
        });

        it('should fail validation with username that is too short', () => {
            const userData = {
                username: 'te',
                password: 'password123',
            };
              const { error } = validateUserLogin(userData);
              expect(error).toBeDefined();
                expect(error.details[0].message).toEqual('Username must be at least 3 characters long');
        });

        it('should fail validation with an invalid email format', () => {
            const userData = {
                 email: 'invalid-email',
                password: 'password123',
            };
            const { error } = validateUserLogin(userData);
             expect(error).toBeDefined();
                expect(error.details[0].message).toEqual('Email must be a valid email address');
        });

        it('should fail validation with an empty password', () => {
            const userData = {
               username: 'testuser',
                password: '',
            };
             const { error } = validateUserLogin(userData);
             expect(error).toBeDefined();
              expect(error.details[0].message).toEqual('Password is required');
        });


        it('should fail validation with a password that is too short', () => {
            const userData = {
               username: 'testuser',
                password: 'pass1',
            };
              const { error } = validateUserLogin(userData);
             expect(error).toBeDefined();
              expect(error.details[0].message).toEqual('Password must be at least 6 characters long');
        });


         it('should fail validation if both username and email is provided', () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            };
            const { error } = validateUserLogin(userData);
            expect(error).toBeDefined();
            expect(error.details[0].message).toBe('\"username\" is not allowed');
        });

         it('should handle rendering with incorrect prop types gracefully', () => {
             const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const userData = {
                username: 123,
                password: 'password123',
            };
             const { error } = validateUserLogin(userData);
                expect(consoleErrorSpy).toHaveBeenCalled();
               expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Username must be a string');
            consoleErrorSpy.mockRestore();
       });


         it('should handle rendering with incorrect email prop types gracefully', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const userData = {
                email: 123,
                password: 'password123',
            };
            const { error } = validateUserLogin(userData);
             expect(consoleErrorSpy).toHaveBeenCalled();
                expect(error).toBeDefined();
              expect(error.details[0].message).toEqual('Email must be a string');
             consoleErrorSpy.mockRestore();
        });


         it('should handle rendering with incorrect password prop types gracefully', () => {
             const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
             const userData = {
                 username: 'testuser',
                  password: 123,
            };
           const { error } = validateUserLogin(userData);
               expect(consoleErrorSpy).toHaveBeenCalled();
               expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Password must be a string');
                consoleErrorSpy.mockRestore();
        });


        it('should return error object even if username is invalid type', () => {
            const userData = {
              username: 123,
                password: 'password123',
            };
            const { error } = validateUserLogin(userData);
             expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Username must be a string');
        });


        it('should return error object even if email is invalid type', () => {
            const userData = {
                email: 123,
                password: 'password123',
             };
              const { error } = validateUserLogin(userData);
               expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Email must be a string');
        });

       it('should return error object even if password is invalid type', () => {
            const userData = {
               username: 'testuser',
               password: 123,
           };
         const { error } = validateUserLogin(userData);
          expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Password must be a string');
       });
    });

    describe('validateGoal', () => {
        it('should pass validation with valid goal data', () => {
            const goalData = {
                description: 'Run 5 miles',
                target: 5,
                progress: 2,
            };
            const { error, value } = validateGoal(goalData);
            expect(error).toBeNull();
            expect(value).toEqual(goalData);
        });

        it('should fail validation with an empty description', () => {
            const goalData = {
                description: '',
                target: 5,
                progress: 2,
            };
            const { error } = validateGoal(goalData);
           expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Description is required');
        });

        it('should fail validation with a description that is too short', () => {
            const goalData = {
                description: 'ru',
                target: 5,
                progress: 2,
            };
              const { error } = validateGoal(goalData);
            expect(error).toBeDefined();
               expect(error.details[0].message).toEqual('Description must be at least 3 characters long');
        });

        it('should fail validation with a negative target', () => {
            const goalData = {
                description: 'Run 5 miles',
                target: -5,
                progress: 2,
            };
              const { error } = validateGoal(goalData);
              expect(error).toBeDefined();
               expect(error.details[0].message).toEqual('Target must be a positive number');
        });

        it('should fail validation with a zero target', () => {
            const goalData = {
                description: 'Run 5 miles',
                target: 0,
                 progress: 2,
           };
            const { error } = validateGoal(goalData);
              expect(error).toBeDefined();
                 expect(error.details[0].message).toEqual('Target must be a positive number');
       });

        it('should fail validation with a negative progress', () => {
            const goalData = {
                description: 'Run 5 miles',
                target: 5,
                progress: -2,
            };
           const { error } = validateGoal(goalData);
           expect(error).toBeDefined();
           expect(error.details[0].message).toEqual('Progress must be a non-negative number');
        });

          it('should fail validation if target is not a number', () => {
             const goalData = {
                  description: 'Run 5 miles',
                 target: '5',
                 progress: 2,
             };
             const { error } = validateGoal(goalData);
               expect(error).toBeDefined();
               expect(error.details[0].message).toEqual('Target must be a number');
         });


        it('should fail validation if progress is not a number', () => {
             const goalData = {
                 description: 'Run 5 miles',
                   target: 5,
                   progress: '2',
              };
            const { error } = validateGoal(goalData);
              expect(error).toBeDefined();
              expect(error.details[0].message).toEqual('Progress must be a number');
        });


        it('should handle rendering with incorrect prop types gracefully', () => {
              const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const goalData = {
                 description: 123,
                  target: 5,
                   progress: 2,
             };
             const { error } = validateGoal(goalData);
            expect(consoleErrorSpy).toHaveBeenCalled();
              expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Description must be a string');
           consoleErrorSpy.mockRestore();
        });

          it('should handle rendering with incorrect target prop types gracefully', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const goalData = {
                description: 'Run 5 miles',
                target: '5',
                progress: 2,
            };
            const { error } = validateGoal(goalData);
            expect(consoleErrorSpy).toHaveBeenCalled();
             expect(error).toBeDefined();
             expect(error.details[0].message).toEqual('Target must be a number');
            consoleErrorSpy.mockRestore();
          });


        it('should handle rendering with incorrect progress prop types gracefully', () => {
             const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const goalData = {
                description: 'Run 5 miles',
                target: 5,
                progress: '2',
             };
             const { error } = validateGoal(goalData);
               expect(consoleErrorSpy).toHaveBeenCalled();
                expect(error).toBeDefined();
                expect(error.details[0].message).toEqual('Progress must be a number');
            consoleErrorSpy.mockRestore();
       });


       it('should return error object even if description is invalid type', () => {
            const goalData = {
                 description: 123,
                 target: 5,
                  progress: 2,
            };
           const { error } = validateGoal(goalData);
              expect(error).toBeDefined();
            expect(error.details[0].message).toEqual('Description must be a string');
        });


       it('should return error object even if target is invalid type', () => {
             const goalData = {
                 description: 'Run 5 miles',
                   target: '5',
                    progress: 2,
           };
            const { error } = validateGoal(goalData);
              expect(error).toBeDefined();
               expect(error.details[0].message).toEqual('Target must be a number');
       });

       it('should return error object even if progress is invalid type', () => {
            const goalData = {
               description: 'Run 5 miles',
                target: 5,
                progress: '2',
             };
            const { error } = validateGoal(goalData);
            expect(error).toBeDefined();
            expect(error.details[0].message).toEqual('Progress must be a number');
        });
    });
});