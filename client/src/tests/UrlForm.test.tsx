import { render, fireEvent, screen } from '@testing-library/react';
import UrlForm from './../components/UrlForm';
import '@testing-library/jest-dom';

describe('UrlForm Component', () => {
  // #1
  test('renders three input fields for URLs', () => {
    render(<UrlForm onSubmit={jest.fn()} />);
    const inputs = screen.getAllByPlaceholderText(/Enter URL/i);
    expect(inputs.length).toBe(3);
  });

  // #2
  test('allows users to type in URLs', () => {
    render(<UrlForm onSubmit={jest.fn()} />);
    const inputs = screen.getAllByPlaceholderText(/Enter URL/i);

    fireEvent.change(inputs[0], { target: { value: 'https://example.com' } });
    fireEvent.change(inputs[1], { target: { value: 'https://google.com' } });
    fireEvent.change(inputs[2], { target: { value: 'https://github.com' } });

    expect((inputs[0] as HTMLInputElement).value).toBe('https://example.com');
    expect((inputs[1] as HTMLInputElement).value).toBe('https://google.com');
    expect((inputs[2] as HTMLInputElement).value).toBe('https://github.com');
  });

  // #3
  test('calls onSubmit with URLs when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<UrlForm onSubmit={mockOnSubmit} />);

    const inputs = screen.getAllByPlaceholderText(/Enter URL/i);
    fireEvent.change(inputs[0], { target: { value: 'https://example.com' } });
    fireEvent.change(inputs[1], { target: { value: 'https://google.com' } });
    fireEvent.change(inputs[2], { target: { value: 'https://github.com' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith([
      'https://example.com',
      'https://google.com',
      'https://github.com',
    ]);
  });

  // #4
  test('shows alert when an empty URL is submitted', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<UrlForm onSubmit={jest.fn()} />);

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(alertMock).toHaveBeenCalledWith('Please enter all URLs.');
    alertMock.mockRestore();
  });

  // #5
  test('does not call onSubmit when URLs are empty', () => {
    const mockOnSubmit = jest.fn();
    render(<UrlForm onSubmit={mockOnSubmit} />);

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
