const Contact = () => (
  <section className="p-8 max-w-3xl mx-auto bg-white shadow-md rounded-2xl">
    <h1 className="text-4xl font-bold text-blue-700 mb-6">Contact Us</h1>

    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Emergency Contacts – Nigerian Police Force</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>
          <strong>General Emergency:</strong> <span className="text-blue-600">112</span>
        </li>
        <li>
          <strong>Lagos Police Command:</strong> <span className="text-blue-600">+234 802 341 3678</span>
        </li>
        <li>
          <strong>Abuja FCT Command:</strong> <span className="text-blue-600">+234 803 200 3913</span>
        </li>
        <li>
          <strong>Rapid Response Squad (RRS):</strong> <span className="text-blue-600">+234 803 201 3333</span>
        </li>
      </ul>
    </div>

    <p className="text-gray-800 text-base">
      For general inquiries, support, or feedback, please contact us at{" "}
      <a
        href="mailto:support@inteldesk.com"
        className="text-blue-500 underline"
      >
        support@inteldesk.com
      </a>.
    </p>
  </section>
);

export default Contact;
