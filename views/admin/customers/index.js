const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Customers';

module.exports = ({customers}) => {
    const renderedCustomers = customers.map(
        customer => {
            return `
<tr>
    <td>${customer.fullName}</td>
    <td>${displayDate(customer.dateCreated)}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.county}</td>
    <td>${customer.town}</td>
    <td>${customer.street}</td>
</tr>
            `}).join('')

    return layout({
        title: title,
        content: `
        <div id="viewProducts" class="card ">
    <div class="card-body table-responsive-md">
        <table class="table table-hover table-bordered border-dark">
            <thead>
            <tr class="table-dark">
                <th scope="col" class="tableHeader view_table_name">Full Name</th>
                <th scope="col" class="tableHeader">Date Created</th>
                <th scope="col" class="tableHeader">Email</th>
                <th scope="col" class="tableHeader">Phone</th>
                <th scope="col" class="tableHeader">County</th>
                <th scope="col" class="tableHeader">Town</th>
                <th scope="col" class="tableHeader">Street</th>
            </tr>
            </thead>
            <tbody>
            ${renderedCustomers}
            </tbody>
        </table>
    </div>
</div>
        `})
}