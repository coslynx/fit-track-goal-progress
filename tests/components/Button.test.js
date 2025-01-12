import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/jest-dom';
import Button from '../../components/Button.jsx';

describe('Button Component', () => {
    it('should render without errors', () => {
        render(<Button text="Test Button" onClick={() => {}} />);
        const buttonElement = screen.getByRole('button', { name: 'Test Button' });
        expect(buttonElement).toBeInTheDocument();
    });

    it('should display the correct text', () => {
        render(<Button text="Click Me" onClick={() => {}} />);
        const buttonElement = screen.getByRole('button', { name: 'Click Me' });
        expect(buttonElement).toHaveTextContent('Click Me');
    });

    it('should call the onClick function when clicked', () => {
        const handleClick = jest.fn();
        render(<Button text="Clickable" onClick={handleClick} />);
        const buttonElement = screen.getByRole('button', { name: 'Clickable' });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have the correct type prop', () => {
        render(<Button text="Submit" onClick={() => {}} type="submit" />);
        const buttonElement = screen.getByRole('button', { name: 'Submit' });
        expect(buttonElement).toHaveAttribute('type', 'submit');
    
        render(<Button text="Reset" onClick={() => {}} type="reset" />);
        const resetButton = screen.getByRole('button', { name: 'Reset' });
         expect(resetButton).toHaveAttribute('type', 'reset');
    
        render(<Button text="Button" onClick={() => {}} type="button" />);
        const buttonTypeButton = screen.getByRole('button', { name: 'Button' });
        expect(buttonTypeButton).toHaveAttribute('type', 'button');
    });

     it('should render with disabled attribute when disabled prop is true', () => {
        const handleClick = jest.fn();
        render(<Button text="Disabled Button" onClick={handleClick} disabled={true} />);
         const buttonElement = screen.getByRole('button', { name: 'Disabled Button' });
        expect(buttonElement).toBeDisabled();
         fireEvent.click(buttonElement);
         expect(handleClick).not.toHaveBeenCalled();
    });
    
    it('should not call the onClick function when disabled', () => {
         const handleClick = jest.fn();
        render(<Button text="Disabled Button" onClick={handleClick} disabled={true} />);
         const buttonElement = screen.getByRole('button', { name: 'Disabled Button' });
         fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('should have the default styles applied', () => {
        render(<Button text="Styled Button" onClick={() => {}} />);
        const buttonElement = screen.getByRole('button', { name: 'Styled Button' });
         expect(buttonElement).toHaveClass('rounded');
        expect(buttonElement).toHaveClass('px-4');
         expect(buttonElement).toHaveClass('py-2');
         expect(buttonElement).toHaveClass('bg-blue-500');
        expect(buttonElement).toHaveClass('text-white');
        expect(buttonElement).toHaveClass('hover:bg-blue-700');
         expect(buttonElement).toHaveClass('focus:outline-none');
         expect(buttonElement).toHaveClass('focus:ring-2');
        expect(buttonElement).toHaveClass('focus:ring-blue-500');
        expect(buttonElement).toHaveClass('focus:ring-opacity-50');
     });
    
    it('should have disabled styles when disabled', () => {
          render(<Button text="Styled Button" onClick={() => {}} disabled={true}/>);
          const buttonElement = screen.getByRole('button', { name: 'Styled Button' });
          expect(buttonElement).toHaveClass('opacity-50');
          expect(buttonElement).toHaveClass('cursor-not-allowed');
    });

    it('should handle rendering with incorrect prop types gracefully', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<Button text={123} onClick="not a function" />);
        expect(consoleErrorSpy).toHaveBeenCalled();
         const buttonElement = screen.queryByRole('button');
          expect(buttonElement).toBeNull();
         consoleErrorSpy.mockRestore();
     });
});