"use client";
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HabitCard from './HabitCard';
import { deleteHabit, reorderHabits } from '@/action/habit';

type Habit = {
  habitId: string;
  habitName: string;
  habitDesc: string;
  entries: string;
  schedule: number[];
  color: string;
};

function SortableHabitItem({ habit, onDelete }: { habit: Habit; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: habit.habitId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1, // hide original — DragOverlay shows the floating copy
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <HabitCard
        habitId={habit.habitId}
        habitName={habit.habitName}
        habitDesc={habit.habitDesc}
        entries={habit.entries}
        schedule={habit.schedule}
        color={habit.color}
        onDelete={onDelete}
        dragListeners={listeners}
      />
    </div>
  );
}

export default function SortableHabitList({ habits }: { habits: Habit[] }) {
  const [items, setItems] = useState(habits);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 8 },
  }));

  const handleDelete = (habitId: string) => {
    setItems(prev => prev.filter(h => h.habitId !== habitId));
    deleteHabit(habitId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(h => h.habitId === active.id);
    const newIndex = items.findIndex(h => h.habitId === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    reorderHabits(newItems.map(h => h.habitId));
  };

  const activeHabit = items.find(h => h.habitId === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(h => h.habitId)} strategy={rectSortingStrategy}>
        <div className='p-2 flex flex-wrap justify-center mt-2'>
          {items.map(habit => (
            <SortableHabitItem key={habit.habitId} habit={habit} onDelete={() => handleDelete(habit.habitId)} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
        {activeHabit && (
          <div style={{ transform: 'scale(1.03)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <HabitCard
              habitId={activeHabit.habitId}
              habitName={activeHabit.habitName}
              habitDesc={activeHabit.habitDesc}
              entries={activeHabit.entries}
              schedule={activeHabit.schedule}
              color={activeHabit.color}
              onDelete={() => {}}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
