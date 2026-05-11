import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from 'recharts';

export function IncomeExpenseChart({ incomes, expenses }) {
  const months = ['Feb', 'Mar', 'Apr'];
  const data = months.map((month, i) => {
    const monthNum = i + 2;
    const monthIncome = incomes
      .filter((inc) => new Date(inc.date).getMonth() + 1 === monthNum)
      .reduce((sum, inc) => sum + inc.amount, 0);
    const monthExpense = expenses
      .filter((exp) => new Date(exp.date).getMonth() + 1 === monthNum)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { month, Income: monthIncome, Expense: monthExpense };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barGap={8}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        />
        <Legend />
        <Bar dataKey="Income" fill="#22c55e" radius={[6, 6, 0, 0]} />
        <Bar dataKey="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SingleBarChart({ data, color, label }) {
  const chartData = data.map((item) => ({
    name: item.category,
    amount: item.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} barGap={8}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        />
        <Bar dataKey="amount" fill={color} radius={[6, 6, 0, 0]} name={label} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function groupTotalsByCategory(items) {
  const totals = new Map();
  for (const item of items ?? []) {
    const category = item?.category ?? 'Other';
    const amount = Number(item?.amount ?? 0);
    if (!Number.isFinite(amount)) continue;
    totals.set(category, (totals.get(category) ?? 0) + amount);
  }

  return Array.from(totals.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function CategoryPieChart({ data, colors }) {
  const chartData = groupTotalsByCategory(data);
  const palette = colors?.length
    ? colors
    : ['#22c55e', '#3b82f6', '#f59e0b', '#a855f7', '#ef4444', '#14b8a6', '#64748b'];

  if (chartData.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-surface-500 text-sm">No data yet</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
          formatter={(value) => [value, 'Amount']}
        />
        <Legend />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={110}
          paddingAngle={2}
        >
          {chartData.map((entry, index) => (
            <Cell key={`${entry.name}-${index}`} fill={palette[index % palette.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
