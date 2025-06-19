const Features = () => (
  <section className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
    <h1 className="text-4xl font-extrabold text-blue-700 mb-6">Core Features</h1>
    <p className="text-gray-800 text-lg mb-6 leading-relaxed">
      IntelDesk offers a suite of powerful tools designed to enhance safety and streamline communication:
    </p>
    <ul className="space-y-4 text-gray-700 list-disc list-inside text-base">
      <li><strong>Real-time Incident Reporting</strong> – Instantly capture and submit incidents as they unfold.</li>
      <li><strong>Role-Based Dashboards</strong> – Tailored views for citizens, responders, and administrators.</li>
      <li><strong>Geolocation Tracking</strong> – Pinpoint incidents and monitor activity across regions.</li>
      <li><strong>Secure Communication Channels</strong> – Ensure sensitive information stays protected.</li>
      <li><strong>Data Analytics & Insights</strong> – Drive smarter decisions with actionable reports.</li>
    </ul>
  </section>
);

export default Features;
