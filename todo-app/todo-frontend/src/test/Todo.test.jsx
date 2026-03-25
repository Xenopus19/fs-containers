import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Todo from '../Todos/Todo';

describe('Todo component', () => {
  const mockTodo = { text: 'Learn Testing', id: 1 };
  const mockDelete = vi.fn(); 
  const mockComplete = vi.fn(); 

  it('shows info correctly', () => {
    render(<Todo todo={mockTodo} onClickComplete={mockComplete} onClickDelete={mockDelete}/>);
    
    expect(screen.getByText('Learn Testing')).toBeDefined();
  });

  it('calls deleteTodo when delete button is clicked', () => {
    render(<Todo todo={mockTodo} onClickComplete={mockComplete} onClickDelete={mockDelete}/>);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith(mockTodo);
  });
});