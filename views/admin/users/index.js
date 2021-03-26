const {displayDate} = require('../../../middlewares/otherFunctions');
const layout = require('../layout');
const title = 'View Users';

module.exports = ({users}) => {
    const renderedUsers = users.map(
        user => {
            return `
<tr>
    <td>${user.fullName}</td>
    <td>${displayDate(user.dateCreated)}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.county}</td>
    <td>${user.town}</td>
    <td>${user.street}</td>
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
                <th scope="col" class="tableHeader">Full Name</th>
                <th scope="col" class="tableHeader">Date Created</th>
                <th scope="col" class="tableHeader">Email</th>
                <th scope="col" class="tableHeader">Phone</th>
                <th scope="col" class="tableHeader">County</th>
                <th scope="col" class="tableHeader">Town</th>
                <th scope="col" class="tableHeader">Street</th>
            </tr>
            </thead>
            <tbody>
            ${renderedUsers}
            </tbody>
        </table>
    </div>
</div>
        `})
}