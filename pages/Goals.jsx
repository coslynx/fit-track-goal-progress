import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Modal from '../components/Modal.jsx';
import { useAuth } from '../hooks/useAuth.js';
import useFetch from '../hooks/useFetch.js';
import GoalCard from '../components/GoalCard.jsx';
import { validateGoal } from '../utils/validators.js';


/**
 * Goals component that manages and displays fitness goals, allowing users to create, edit, and delete them.
 * @returns {JSX.Element|null} - The goals page element or null in case of error.
 */
const Goals = () => {
    const navigate = useNavigate();
     const [searchParams] = useSearchParams();
    const { user, token } = useAuth();
    const [goals, setGoals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [goalToEdit, setGoalToEdit] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        target: '',
        progress: '',
    });
      const [errors, setErrors] = useState({});
     const { fetchData, loading, error } = useFetch();


    useEffect(() => {
          if (!user) {
              navigate('/');
               return;
           }
        const fetchGoals = async () => {
            try {
                const data = await fetchData('/api/goals', 'GET', null, token);
                if (data) {
                     setGoals(data);
                }
            } catch (fetchError) {
               console.error('Error fetching goals:', fetchError);
             }
           };
         fetchGoals();
         const editGoalId = searchParams.get('edit');
          if(editGoalId){
             const goal = goals.find(goal => goal._id === editGoalId);
             if(goal){
                openModal('edit', goal)
             }
          }
       }, [user, navigate, fetchData, token, searchParams, goals]);


       const openModal = (type, goal = null) => {
           setModalType(type);
           setGoalToEdit(goal);
           setFormData({
             description: goal?.description || '',
               target: goal?.target?.toString() || '',
               progress: goal?.progress?.toString() || '',
         });
          setIsModalOpen(true);
            setErrors({});
       };

    const closeModal = () => {
        setIsModalOpen(false);
          setFormData({
              description: '',
              target: '',
              progress: '',
          });
           setGoalToEdit(null);
          setModalType(null);
           setErrors({});
    };

    const handleInputChange = (event) => {
           const { name, value } = event.target;
           let parsedValue = value;
            if(name === 'target' || name === 'progress'){
                parsedValue =  value === '' ? '' :  parseFloat(value);
           }
          setFormData({
            ...formData,
              [name]: parsedValue,
          });
    };

    const handleAddGoal = async () => {
           const { error } = validateGoal(formData);
           if(error){
                const validationErrors = error.details.reduce((acc, err) => {
                    acc[err.context.key] = err.message;
                    return acc;
                }, {});
                setErrors(validationErrors);
               return;
            }
        try {
             await fetchData('/api/goals', 'POST', formData, token);
                closeModal();
              const data = await fetchData('/api/goals', 'GET', null, token);
                 if(data){
                    setGoals(data);
                  }
        } catch (addError) {
            console.error('Error adding goal:', addError);
            setErrors({form: addError.message});
         }
    };

    const handleUpdateGoal = async () => {
        if (!goalToEdit || !goalToEdit.id) {
            console.error('Goal ID is missing for update');
           return;
       }
          const { error } = validateGoal(formData);
            if (error) {
                const validationErrors = error.details.reduce((acc, err) => {
                    acc[err.context.key] = err.message;
                    return acc;
                 }, {});
               setErrors(validationErrors);
                return;
            }
       try {
            await fetchData(`/api/goals/${goalToEdit.id}`, 'PUT', formData, token);
            closeModal();
              const data = await fetchData('/api/goals', 'GET', null, token);
                 if(data){
                     setGoals(data);
                  }
        } catch (updateError) {
              console.error('Error updating goal:', updateError);
             setErrors({ form: updateError.message });
       }
    };

    const handleDeleteGoal = async (goalId) => {
         try {
              await fetchData(`/api/goals/${goalId}`, 'DELETE', null, token);
                const data = await fetchData('/api/goals', 'GET', null, token);
                if(data){
                     setGoals(data);
                  }
         } catch (deleteError) {
           console.error('Error deleting goal:', deleteError);
        }
    };

    if (!user) {
        return null;
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-semibold mb-6">Manage Goals</h1>
              {loading && <p>Loading goals...</p>}
            {error && <p className="text-red-500 mb-4">Error: {error.message || 'Failed to load goals. Please try again.'}</p>}

            {goals && goals.length > 0 ? (
                   <div className="flex flex-col w-full max-w-2xl">
                       {goals.map((goal) => (
                             <GoalCard
                                 key={goal._id}
                                 goal={{
                                     id: goal._id,
                                     description: goal.description,
                                     target: goal.target,
                                    progress: goal.progress,
                                 }}
                                  onEdit={() => openModal('edit', goal)}
                                  onDelete={handleDeleteGoal}
                            />
                        ))}
                   </div>
             ) : !loading && !error && (
                    <p className="text-gray-600 mb-4">No goals set yet. Start by adding one!</p>
               )}


             <Button text="Add Goal" onClick={() => openModal('add')} />


            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                         {modalType === 'add' ? 'Add Goal' : 'Edit Goal'}
                    </h2>
                       {errors.form && (
                            <div className="text-red-500 text-sm mt-1" style={{ color: 'red' }}>
                                {errors.form}
                             </div>
                       )}
                        <Input
                            label="Description"
                            type="text"
                            placeholder="Enter goal description"
                            value={formData.description}
                            onChange={handleInputChange}
                            name="description"
                           error={errors.description}
                        />
                         <Input
                            label="Target"
                            type="number"
                            placeholder="Enter target value"
                           value={formData.target}
                             onChange={handleInputChange}
                             name="target"
                             error={errors.target}
                         />
                        <Input
                           label="Progress"
                           type="number"
                           placeholder="Enter current progress"
                             value={formData.progress}
                             onChange={handleInputChange}
                            name="progress"
                           error={errors.progress}
                       />
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button text="Cancel" onClick={closeModal} />
                        <Button
                            text="Save"
                            onClick={modalType === 'add' ? handleAddGoal : handleUpdateGoal}
                        />
                   </div>
                </div>
            </Modal>
        </div>
    );
};

Goals.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
    }),
    token: PropTypes.string,
};

export default Goals;