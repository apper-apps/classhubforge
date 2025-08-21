const studentService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "date_of_birth_c" } },
          { field: { Name: "enrollment_date_c" } },
          { field: { Name: "grade_level_c" } },
          { field: { Name: "academic_year_c" } },
          { field: { Name: "marks_c" } },
          { field: { Name: "status_c" } }
        ]
      };

const response = await apperClient.fetchRecords('student_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform database field names to UI property names
const transformedData = (response.data || []).map(student => ({
        Id: student.Id,
        name: student.Name || `${student.first_name_c || ''} ${student.last_name_c || ''}`.trim(),
        firstName: student.first_name_c,
        lastName: student.last_name_c,
        email: student.email_c,
        phone: student.phone_c,
        dateOfBirth: student.date_of_birth_c,
        enrollmentDate: student.enrollment_date_c,
        gradeLevel: student.grade_level_c,
        academicYear: student.academic_year_c,
        marks: student.marks_c,
        status: student.status_c
      }));
      
      return transformedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching students:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "date_of_birth_c" } },
          { field: { Name: "enrollment_date_c" } },
          { field: { Name: "grade_level_c" } },
          { field: { Name: "academic_year_c" } },
          { field: { Name: "marks_c" } },
          { field: { Name: "status_c" } }
        ]
      };

const response = await apperClient.getRecordById('student_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Transform database field names to UI property names
const student = response.data;
if (student) {
        return {
          Id: student.Id,
          name: student.Name || `${student.first_name_c || ''} ${student.last_name_c || ''}`.trim(),
          firstName: student.first_name_c,
          lastName: student.last_name_c,
          email: student.email_c,
          phone: student.phone_c,
          dateOfBirth: student.date_of_birth_c,
          enrollmentDate: student.enrollment_date_c,
          gradeLevel: student.grade_level_c,
          academicYear: student.academic_year_c,
          marks: student.marks_c,
          status: student.status_c
        };
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching student with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  },

  async create(studentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

const params = {
        records: [studentData]
      };

      const response = await apperClient.createRecord('student_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create students ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error}`);
            });
          });
        }
        
if (successfulRecords.length > 0) {
const student = successfulRecords[0].data;
          return {
            Id: student.Id,
            name: student.Name || `${student.first_name_c || ''} ${student.last_name_c || ''}`.trim(),
            firstName: student.first_name_c,
            lastName: student.last_name_c,
            email: student.email_c,
            phone: student.phone_c,
            dateOfBirth: student.date_of_birth_c,
            enrollmentDate: student.enrollment_date_c,
            gradeLevel: student.grade_level_c,
            academicYear: student.academic_year_c,
            marks: student.marks_c,
            status: student.status_c
          };
        }
        return null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating student:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  },

  async update(id, studentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

const params = {
        records: [{
          Id: parseInt(id),
          ...studentData
        }]
      };

      const response = await apperClient.updateRecord('student_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update students ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error}`);
            });
          });
        }
        
if (successfulRecords.length > 0) {
const student = successfulRecords[0].data;
          return {
            Id: student.Id,
            name: student.Name || `${student.first_name_c || ''} ${student.last_name_c || ''}`.trim(),
            firstName: student.first_name_c,
            lastName: student.last_name_c,
            email: student.email_c,
            phone: student.phone_c,
            dateOfBirth: student.date_of_birth_c,
            enrollmentDate: student.enrollment_date_c,
            gradeLevel: student.grade_level_c,
            academicYear: student.academic_year_c,
            marks: student.marks_c,
            status: student.status_c
          };
        }
        return null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating student:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

const response = await apperClient.deleteRecord('student_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete students ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) console.error(record.message);
          });
        }
        
        return response.results[0]?.success || false;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting student:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
};
export default studentService;