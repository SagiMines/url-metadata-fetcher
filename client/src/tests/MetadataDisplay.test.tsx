import { render, screen } from '@testing-library/react';
import MetadataDisplay from './../components/MetadataDisplay';
import '@testing-library/jest-dom';

describe('MetadataDisplay Component', () => {
  // Mock metadata
  const mockMetadata = [
    {
      title: 'Example Title',
      description: 'This is a description of example.com',
      image: 'https://example.com/image.png',
    },
    {
      title: 'Google',
      description: 'Google Search Engine',
      image: 'https://google.com/logo.png',
    },
  ];

  // Mock error array
  const mockError = [
    {
      error: 'Cannot display metadat for url: https://exam1ple23123.com',
    },
  ];

  // #1
  test('renders metadata correctly', () => {
    render(<MetadataDisplay metadataList={mockMetadata} />);
    expect(screen.getByText('Example Title')).toBeInTheDocument();
    expect(
      screen.getByText('This is a description of example.com')
    ).toBeInTheDocument();
    expect(screen.getByAltText('Example Title')).toBeInTheDocument();
  });

  // #2
  test('renders multiple metadata entries', () => {
    render(<MetadataDisplay metadataList={mockMetadata} />);
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Google Search Engine')).toBeInTheDocument();
  });

  // #3
  test('shows error message when provided', () => {
    const errorMessage =
      'Cannot display metadat for url: https://exam1ple23123.com';
    render(<MetadataDisplay metadataList={mockError} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  // #4
  test('displays metadata image correctly', () => {
    render(<MetadataDisplay metadataList={mockMetadata} />);
    const img = screen.getByAltText('Example Title') as HTMLImageElement;
    expect(img.src).toBe('https://example.com/image.png');
  });

  // #5
  test('does not display anything when metadataList is empty and no error', () => {
    render(<MetadataDisplay metadataList={[]} />);
    expect(screen.queryByText('Example Title')).toBeNull();
    expect(screen.queryByText('Google')).toBeNull();
  });
});
