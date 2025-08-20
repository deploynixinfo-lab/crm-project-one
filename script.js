// --- Chart.js Bar Chart: Report Sales ---
const barCtx = document.getElementById('barChart').getContext('2d');
const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Sales',
    data: [2000, 3000, 3000, 4090, 3000, 2800, 2900],
    backgroundColor: function(ctx) {
      // Highlight Thursday with hatch pattern
      const i = ctx.dataIndex;
      if (i === 3) {
        // Create a diagonal hatch pattern for Thursday
        const canvas = document.createElement('canvas');
        canvas.width = 16; canvas.height = 16;
        const c = canvas.getContext('2d');
        c.fillStyle = '#b8b0d6';
        c.fillRect(0, 0, 16, 16);
        c.strokeStyle = '#fff';
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(0, 16); c.lineTo(16, 0);
        c.stroke();
        return ctx.chart.ctx.createPattern(canvas, 'repeat');
      }
      return '#e6e2f5';
    },
    borderRadius: 12,
    borderSkipped: false,
    maxBarThickness: 48
  }]
};
const barChart = new Chart(barCtx, {
  type: 'bar',
  data: barData,
  options: {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString()} | Thu, 12 Jul`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 14 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e6e2f5' },
        ticks: { font: { size: 14 } }
      }
    }
  }
});
// --- Chart.js Donut Chart: Cost Breakdown ---
const donutCtx = document.getElementById('donutChart').getContext('2d');
const donutData = {
  labels: ['Maintenance', 'Repair', 'Taxes', 'Saving'],
  datasets: [{
    data: [2500, 800, 900, 550],
    backgroundColor: [
      '#8fd19e', '#f7d59c', '#b8b0d6', '#a3c4f3'
    ],
    borderWidth: 0
  }]
};
const donutChart = new Chart(donutCtx, {
  type: 'doughnut',
  data: donutData,
  options: {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: $${context.parsed.toLocaleString()}`;
          }
        }
      }
    }
  }
});
// --- Sample Data: Transactions & Maintenance Requests ---
const transactions = [
  {
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64',
    title: '123 Maple Avenue Springfield',
    date: '12 Sep 2024, 9:29',
    amount: '$30K'
  },
  {
    thumb: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=64&h=64',
    title: 'Booking 987 Villa Street',
    date: '10 Sep 2024, 9:29',
    amount: '$10K'
  },
  {
    thumb: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=facearea&w=64&h=64',
    title: 'Apartment Booking On Garden Street',
    date: '09 Sep 2024, 14:10',
    amount: '$20K'
  }
];
const requests = [
  {
    status: 'plumbing',
    title: 'Plumbing | 721 Meadowview',
    id: 'MR-001',
    desc: 'Broken Garbage',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Jacob Jones'
  },
  {
    status: 'electrical',
    title: 'Electrical | 721 Meadowview',
    id: 'MR-002',
    desc: 'No Heat Bathroom',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: 'Albert Flores'
  },
  {
    status: 'hvac',
    title: 'HVAC | 721 Meadowview',
    id: 'MR-003',
    desc: 'Non Functional Fan',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
    name: 'Robert Fox'
  }
];
// --- Render Transactions List ---
const txList = document.querySelector('.transactions-list');
txList.innerHTML = transactions.map(tx => `
  <li style="display: flex; align-items: center; justify-content: space-between;">
    <img src="${tx.thumb}" alt="Property" class="transaction-thumb">
    <div class="transaction-info">
      <div class="transaction-title">${tx.title}</div>
      <div class="transaction-date">${tx.date}</div>
    </div>
    <div class="transaction-amount" style="color: #3bb77e; font-weight: bold; margin-left: auto;">${tx.amount}</div>
  </li>
`).join('');
// --- Render Maintenance Requests List ---
const reqList = document.querySelector('.requests-list');
reqList.innerHTML = requests.map(req => {
  let iconSVG = '';
  if (req.status === 'plumbing') {
    iconSVG = `<svg width="24" height="24" fill="none" stroke="#8fd19e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>`;
  } else if (req.status === 'electrical') {
    iconSVG = `<svg width="24" height="24" fill="none" stroke="#f7d59c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
  } else if (req.status === 'hvac') {
    iconSVG = `<svg width="24" height="24" fill="none" stroke="#a3c4f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15c1.5-2 6.5-2 8 0"/></svg>`;
  }
  return `
    <li style="display: flex; align-items: center; justify-content: space-between;">
      <span class="request-status ${req.status}" style="display: flex; align-items: center; justify-content: center;">${iconSVG}</span>
      <div class="request-info">
        <div class="request-title">${req.title}</div>
        <div class="request-id">Request ID: ${req.id}</div>
        <div class="request-desc">${req.desc}</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <img src="${req.avatar}" alt="${req.name}" class="request-avatar">
        <span class="request-user" style="color: #1E1630; font-weight: 600;">${req.name}</span>
      </div>
    </li>
  `;
}).join('');
// --- Dropdown Toggle (Weekday) ---
const dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', () => {
  // Example: toggle dataset (not implemented, just visual feedback)
  dropdown.classList.toggle('open');
});
// --- Minimal Hover/Focus Interactivity ---
document.querySelectorAll('button, .dropdown, a').forEach(el => {
  el.addEventListener('focus', () => el.classList.add('focus'));
  el.addEventListener('blur', () => el.classList.remove('focus'));
});
