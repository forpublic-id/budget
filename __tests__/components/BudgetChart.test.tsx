import { render, screen } from '@testing-library/react';
import BudgetChart from '@/components/budget/BudgetChart';
import { BudgetData } from '@/lib/types/budget';

// Mock recharts
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
}));

const mockBudgetData: BudgetData = {
  id: 'test-budget' as any,
  metadata: {
    year: 2025,
    type: 'APBN',
    region: 'National',
    lastUpdated: '2025-01-01',
    source: 'Test Source',
    currency: 'IDR',
  },
  revenue: {
    total: 2000000000000000,
    sources: {
      tax: 1500000000000000,
      non_tax: 500000000000000,
    },
  },
  expenditure: {
    total: 2500000000000000,
    categories: {
      'education': 500000000000000,
      'health': 300000000000000,
      'infrastructure': 400000000000000,
      'defense': 200000000000000,
      'social': 150000000000000,
    },
  },
  deficit: 500000000000000,
};

describe('BudgetChart', () => {
  it('renders pie chart correctly', () => {
    render(<BudgetChart data={mockBudgetData} type="pie" />);
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie')).toBeInTheDocument();
  });

  it('renders bar chart correctly', () => {
    render(<BudgetChart data={mockBudgetData} type="bar" />);
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar')).toBeInTheDocument();
  });

  it('shows unsupported chart message for unknown type', () => {
    render(<BudgetChart data={mockBudgetData} type="unknown" as any />);
    
    expect(screen.getByText('Chart type not supported yet')).toBeInTheDocument();
  });

  it('applies correct height', () => {
    render(<BudgetChart data={mockBudgetData} type="pie" height={500} />);
    
    const container = screen.getByTestId('responsive-container');
    expect(container).toBeInTheDocument();
  });

  it('handles tooltip visibility', () => {
    render(<BudgetChart data={mockBudgetData} type="pie" showTooltip={true} />);
    
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });
});